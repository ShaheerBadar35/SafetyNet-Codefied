package com.safetynet.app

import android.Manifest
import android.content.pm.PackageManager
import android.net.Uri
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.content.Context
import android.os.Build
import android.telecom.TelecomManager
import android.telephony.TelephonyManager
import android.app.Service
import android.content.BroadcastReceiver
import android.content.IntentFilter
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat

class CallForegroundService : Service() {

    private val CHANNEL_ID = "call_service_channel"

    override fun onCreate() {
        super.onCreate()
        // Create a notification channel for Android O (API 26) and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Call Service Channel",
                NotificationManager.IMPORTANCE_LOW
            )
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }

        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Call Service Running")
            .setContentText("Foreground service is running")
            .setSmallIcon(R.drawable.ic_launcher) // Ensure this icon exists
            .build()

        startForeground(1, notification)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("CallForegroundService", "Service started with intent: $intent")
        val phoneNumber = intent?.getStringExtra("phone_number")

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            // Handle the case where permission is not granted
            Log.e("CallForegroundService", "RECORD_AUDIO permission not granted")
            // Optionally, request permission here if this is an Activity or notify the user
            return START_NOT_STICKY
        }

        if (phoneNumber != null) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE) == PackageManager.PERMISSION_GRANTED) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    val telecomManager = getSystemService(Context.TELECOM_SERVICE) as TelecomManager
                    try {
                        telecomManager.placeCall(Uri.parse("tel:$phoneNumber"), null)
                        Log.d("CallForegroundService", "Calling $phoneNumber")
                    } catch (e: SecurityException) {
                        Log.e("CallForegroundService", "Failed to make a call: Permission not granted", e)
                    } catch (e: Exception) {
                        Log.e("CallForegroundService", "Failed to make a call", e)
                    }
                } else {
                try {
                    val callIntent = Intent(Intent.ACTION_CALL).apply {
                        data = Uri.parse("tel:$phoneNumber")
                        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    }
                    startActivity(callIntent)
                    Log.d("CallForegroundService", "Calling $phoneNumber")
                } catch (e: SecurityException) {
                    Log.e("CallForegroundService", "Failed to make a call: Permission not granted", e)
                } catch (e: Exception) {
                    Log.e("CallForegroundService", "Failed to make a call", e)
                }
                }
            } else {
                Log.e("CallForegroundService", "CALL_PHONE permission not granted")
            }
        } else {
            Log.e("CallForegroundService", "Phone number is null")
        }
        return START_NOT_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}
