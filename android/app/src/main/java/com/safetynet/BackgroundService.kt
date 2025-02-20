package com.safetynet.app

import android.Manifest
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.content.Context
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.IBinder
import android.speech.SpeechRecognizer
import android.speech.RecognitionListener
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import android.content.pm.PackageManager

class BackgroundService : Service(), RecognitionListener {

    private val CHANNEL_ID = "BackgroundServiceChannel"
    private val NOTIFICATION_ID = 1
    private lateinit var speechRecognizer: SpeechRecognizer

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel() // Ensure the notification channel is created for Android O and above
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this)
        speechRecognizer.setRecognitionListener(this)
        startListening()
        Log.d("BackgroundService", "Service created")
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("BackgroundService", "Service started")
        startForeground(NOTIFICATION_ID, getNotification()) // Start foreground service with a notification
        return START_STICKY
    }

    override fun onReadyForSpeech(params: Bundle?) {
        Log.d("BackgroundService", "Ready for speech")
    }

    override fun onBeginningOfSpeech() {
        Log.d("BackgroundService", "Speech has begun")
    }

    override fun onRmsChanged(rmsdB: Float) {
        // Handle changes in the RMS level
    }

    override fun onBufferReceived(buffer: ByteArray?) {
        // Handle audio buffer data
    }

    override fun onEndOfSpeech() {
        Log.d("BackgroundService", "Speech has ended")
    }

    override fun onPartialResults(partialResults: Bundle?) {
        // Handle partial results
    }

    override fun onEvent(eventType: Int, params: Bundle?) {
        // Handle events
    }

    override fun onResults(results: Bundle?) {
        val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
        matches?.let { recognizedTexts ->
            val recognizedText = recognizedTexts.joinToString(" ")
            Log.d("BackgroundService", "Recognized Text: $recognizedText")

            // Broadcast the recognized text
            val broadcastIntent = Intent("SPEECH_RECOGNIZED")
            broadcastIntent.putExtra("recognizedText", recognizedText)
            sendBroadcast(broadcastIntent)

            // Check for specific keyword and initiate call
            if (recognizedText.contains("hello", ignoreCase = true)) {
                // Only initiate call if permission is granted
                if (ContextCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE) == PackageManager.PERMISSION_GRANTED) {
                    initiateCall("1234567890") // Replace with the phone number you want to call
                } else {
                    Log.e("BackgroundService", "CALL_PHONE permission is not granted")
                }
            }
        }
    }

    override fun onError(error: Int) {
        Log.e("BackgroundService", "Error: $error")
    }

    private fun getNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Background Service")
            .setContentText("Running speech recognition")
            .setSmallIcon(R.drawable.ic_launcher) // Ensure this drawable exists
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setOngoing(true)
            .build()
    }

    private fun createNotificationChannel() {
        // Create a notification channel for Android O and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "Background Service Channel",
                NotificationManager.IMPORTANCE_DEFAULT // Ensure the importance is set to a suitable level
            )
            val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            manager.createNotificationChannel(serviceChannel)
        }
    }

    private fun startListening() {
        val intent = Intent()
        speechRecognizer.startListening(intent)
    }

    private fun initiateCall(phoneNumber: String) {
        val callIntent = Intent(Intent.ACTION_CALL)
        callIntent.data = Uri.parse("tel:$phoneNumber")
        // Check if CALL_PHONE permission is granted
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE) == PackageManager.PERMISSION_GRANTED) {
            startActivity(callIntent)
        } else {
            Log.e("BackgroundService", "CALL_PHONE permission is not granted")
        }
    }
}
