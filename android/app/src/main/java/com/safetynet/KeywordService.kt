package com.safetynet.app

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat

class KeywordService : Service() {

    private val CHANNEL_ID = "keyword_service_channel"
    private lateinit var reactContext: ReactApplicationContext

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        startForegroundService()
    }

    // Create a notification channel for Android O and above
    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Keyword Service Channel",
                NotificationManager.IMPORTANCE_LOW
            )
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }
    }

    // Start the service as a foreground service
    private fun startForegroundService() {
        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Keyword Service Running")
            .setContentText("Foreground service is active")
            .setSmallIcon(R.drawable.ic_launcher) // Ensure this icon exists
            .build()

        startForeground(1, notification)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("KeywordService", "Service started with intent: $intent")
        val keyword = intent?.getStringExtra("keyword")

        if (keyword != null) {
            emitKeyword(keyword)
        } else {
            Log.e("KeywordService", "Keyword is null")
        }
        
        return START_NOT_STICKY
    }

    // Emit the received keyword to the React Native side
    private fun emitKeyword(keyword: String) {
        if (::reactContext.isInitialized) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("KeywordReceived", keyword)
            Log.d("KeywordService", "Keyword emitted: $keyword")
        } else {
            Log.e("KeywordService", "React context is not initialized")
        }
    }

    // Set the ReactApplicationContext
    fun setReactContext(reactContext: ReactApplicationContext) {
        this.reactContext = reactContext
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}
