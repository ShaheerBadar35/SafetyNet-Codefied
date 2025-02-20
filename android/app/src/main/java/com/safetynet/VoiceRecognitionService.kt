package com.safetynet.app

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.IBinder
import android.speech.SpeechRecognizer
import android.speech.RecognitionListener
import android.speech.SpeechRecognizer.createSpeechRecognizer
import android.util.Log
import androidx.core.app.NotificationCompat
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat
import androidx.core.app.ActivityCompat

class VoiceRecognitionService : Service(), RecognitionListener {

    private val CHANNEL_ID = "VoiceRecognitionServiceChannel"
    private val NOTIFICATION_ID = 1
    private lateinit var speechRecognizer: SpeechRecognizer

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        speechRecognizer = createSpeechRecognizer(this)
        speechRecognizer.setRecognitionListener(this)
        startListening()
        Log.d("VoiceRecognitionService", "Service created")
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("VoiceRecognitionService", "Service started")
        startForeground(NOTIFICATION_ID, getNotification())
        return START_STICKY
    }

    override fun onReadyForSpeech(params: Bundle?) {
        Log.d("VoiceRecognitionService", "Ready for speech")
    }

    override fun onBeginningOfSpeech() {
        Log.d("VoiceRecognitionService", "Speech has begun")
    }

    override fun onRmsChanged(rmsdB: Float) {
        // Handle changes in the RMS level
    }

    override fun onBufferReceived(buffer: ByteArray?) {
        // Handle audio buffer data
    }

    override fun onEndOfSpeech() {
        Log.d("VoiceRecognitionService", "Speech has ended")
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
            Log.d("VoiceRecognitionService", "Recognized Text: $recognizedText")
            
            // Check for specific keyword to make a call
            if (recognizedText.contains("hello", ignoreCase = true)) {
                makeCall("123456789") // Replace with actual phone number or parameterize it
            }
            
            // Broadcast the recognized text
            val broadcastIntent = Intent("SPEECH_RECOGNIZED")
            broadcastIntent.putExtra("recognizedText", recognizedText)
            sendBroadcast(broadcastIntent)
        }
    }

    override fun onError(error: Int) {
        Log.e("VoiceRecognitionService", "Error: $error")
    }

    private fun getNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Voice Recognition Service")
            .setContentText("Running speech recognition")
            .setSmallIcon(R.drawable.ic_launcher) // Use your app icon here
            .setPriority(NotificationCompat.PRIORITY_HIGH) // Update priority for newer Android versions
            .setOngoing(true)
            .build()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "Voice Recognition Service Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(serviceChannel)
        }
    }

    private fun startListening() {
        val intent = Intent()
        speechRecognizer.startListening(intent)
    }

    private fun makeCall(phoneNumber: String) {
        val intent = Intent(Intent.ACTION_CALL)
        intent.data = Uri.parse("tel:$phoneNumber")
        // Check permission and handle it gracefully
        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.CALL_PHONE) == PackageManager.PERMISSION_GRANTED) {
            startActivity(intent)
        } else {
            // Request permission if not granted (this might need to be handled in an Activity)
            Log.e("VoiceRecognitionService", "CALL_PHONE permission is not granted")
            // Optional: You could trigger a callback or notification here to inform the user.
        }
    }
}
