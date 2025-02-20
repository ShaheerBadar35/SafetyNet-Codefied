package com.safetynet.app

import android.Manifest
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.IBinder
import android.telephony.SmsManager
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat

class SmsForegroundService : Service() {

    private val CHANNEL_ID = "sms_service_channel"

    override fun onCreate() {
        super.onCreate()
        // Create a notification channel for Android O (API 26) and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "SMS Service Channel",
                NotificationManager.IMPORTANCE_LOW
            )
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }

        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("SMS Service Running")
            .setContentText("Foreground service is running")
            .setSmallIcon(R.drawable.ic_launcher) // Ensure this icon exists
            .build()

        startForeground(1, notification)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("SmsForegroundService", "Service started with intent: $intent")
        val phoneNumber = intent?.getStringExtra("phone_number")
        val message = intent?.getStringExtra("message")

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.SEND_SMS) != PackageManager.PERMISSION_GRANTED) {
            // Handle the case where permission is not granted
            Log.e("SmsForegroundService", "SEND_SMS permission not granted")
            // Optionally, request permission here if this is an Activity or notify the user
            return START_NOT_STICKY
        }

        if (phoneNumber != null && message != null) {
            try {
                val smsManager = SmsManager.getDefault()
                smsManager.sendTextMessage(phoneNumber, null, message, null, null)
                Log.d("SmsForegroundService", "SMS sent to $phoneNumber")
            } catch (e: SecurityException) {
                Log.e("SmsForegroundService", "Failed to send SMS: Permission not granted", e)
            } catch (e: Exception) {
                Log.e("SmsForegroundService", "Failed to send SMS", e)
            }
        } else {
            Log.e("SmsForegroundService", "Phone number or message is null")
        }
        return START_NOT_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}
