package com.safetynet.app

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.PowerManager
import android.util.Log
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class ScreenService : Service() {

    private lateinit var powerManager: PowerManager
    private var powerButtonPressCount = 0
    private var firstPressTime: Long = 0
    private val maxDuration = 3000 // 3 seconds in milliseconds
    private var eventSent = false // Flag to track if event has been sent

    // Define the BroadcastReceiver
    private val screenStateReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == Intent.ACTION_SCREEN_ON || intent?.action == Intent.ACTION_SCREEN_OFF) {
                val currentTime = System.currentTimeMillis()

                if (powerButtonPressCount == 0) {
                    // This is the first press
                    firstPressTime = currentTime
                }

                powerButtonPressCount++

                Log.d("ScreenService", "Power button pressed count: $powerButtonPressCount")

                // Check if the total duration from the first press to the current press is within 3 seconds
                if (currentTime - firstPressTime <= maxDuration) {
                    // Check if the count reaches 3 and the event has not been sent yet
                    if (powerButtonPressCount == 3 && !eventSent) {
                        sendPowerButtonPressedToReactNative()
                        // Reset the count and the flag after sending the event
                        resetPowerButtonPressCount()
                    }
                } else {
                    // Reset the count if the time exceeds 3 seconds
                    resetPowerButtonPressCount()
                }
            }
        }
    }

    override fun onCreate() {
        super.onCreate()
        Log.d("ScreenService", "Service created")

        powerManager = getSystemService(Context.POWER_SERVICE) as PowerManager
        startForegroundService()
        registerScreenStateReceiver()
    }

    private fun startForegroundService() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "screen_state_channel"
            val channelName = "Screen State Service"
            val channel = NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_LOW)
            (getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager).createNotificationChannel(channel)

            val notification: Notification = Notification.Builder(this, channelId)
                .setContentTitle("Screen State Detection")
                .setContentText("Monitoring screen on/off state")
                .setSmallIcon(R.drawable.ic_launcher)
                .build()

            startForeground(1, notification)
            Log.d("ScreenService", "Foreground service started")
        }
    }

    private fun registerScreenStateReceiver() {
        val filter = IntentFilter().apply {
            addAction(Intent.ACTION_SCREEN_ON)
            addAction(Intent.ACTION_SCREEN_OFF)
        }
        registerReceiver(screenStateReceiver, filter)
        Log.d("ScreenService", "Screen state receiver registered")
    }

    private fun sendPowerButtonPressedToReactNative() {
        val params: WritableMap = Arguments.createMap()
        params.putString("powerButtonState", "PRESSED_THREE_TIMES")

        val reactContext = (applicationContext as ReactApplication).reactNativeHost.reactInstanceManager.currentReactContext
        Log.d("ScreenService", "Sending power button pressed event to React Native")

        reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("PowerButtonPressed", params)

        if (reactContext == null) {
            Log.e("ScreenService", "React context is null. Unable to send event.")
        } else {
            Log.d("ScreenService", "Event sent successfully.")
        }

        // Set the flag to true to indicate that the event has been sent
        eventSent = true
    }

    private fun resetPowerButtonPressCount() {
        powerButtonPressCount = 0
        firstPressTime = 0
        eventSent = false // Reset the flag as well
        Log.d("ScreenService", "Power button press count reset")
    }

    override fun onDestroy() {
        super.onDestroy()
        unregisterReceiver(screenStateReceiver)
        Log.d("ScreenService", "Screen state receiver unregistered")
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
