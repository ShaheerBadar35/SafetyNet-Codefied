package com.safetynet.app

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.util.Log
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule

class FunctionForegroundService : Service() {

    private val CHANNEL_ID = "function_service_channel"
    private var isRunning = false
    private var functionCallInterval: Long = 5000 // Default interval is 5 seconds
    private val handler = Handler(Looper.getMainLooper())
    private lateinit var reactAppContext: ReactApplicationContext

    companion object {
        var reactContext: ReactApplicationContext? = null
    }

    override fun onCreate() {
        super.onCreate()
        Log.d("FunctionForegroundService", "Service created")
        createNotificationChannel()
        startForegroundService()
        isRunning = true
        startFunctionCalls()
    }

    private fun startForegroundService() {
        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Function Service Running")
            .setContentText("Foreground service is running")
            .setSmallIcon(R.drawable.ic_launcher) // Replace with an actual icon
            .build()
        startForeground(1, notification)
    }

    private fun startFunctionCalls() {
        handler.post(object : Runnable {
            override fun run() {
                if (isRunning) {
                    callFunctionInReactNative()
                    handler.postDelayed(this, functionCallInterval)
                }
            }
        })
    }

    private fun callFunctionInReactNative() {
        reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("FunctionCall", null)
        Log.d("FunctionForegroundService", "Function called in React Native")
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Function Service Channel",
                NotificationManager.IMPORTANCE_LOW
            )
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        isRunning = false
        handler.removeCallbacksAndMessages(null)
        Log.d("FunctionForegroundService", "Service destroyed")
    }

    override fun onBind(intent: Intent?): IBinder? = null

    fun setReactAppContext(context: ReactApplicationContext) {
        this.reactAppContext = context
    }
}
