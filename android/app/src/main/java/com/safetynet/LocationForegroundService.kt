package com.safetynet.app

import android.Manifest
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.os.Looper
import android.util.Log
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.location.*
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.bridge.Arguments

class LocationForegroundService : Service() {

    private val CHANNEL_ID = "location_service_channel"
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var locationCallback: LocationCallback
    private lateinit var reactAppContext: ReactApplicationContext
    private var locationServiceModule: LocationServiceModule? = null

    companion object {
        var reactContext: ReactApplicationContext? = null
    }

    override fun onCreate() {
        super.onCreate()
        Log.d("LocationForegroundService", "Service created")
        createNotificationChannel()
        startForegroundService()

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        setupLocationCallback()
        startLocationUpdates()
    }

    private fun startForegroundService() {
        Log.d("LocationForegroundService", "Starting foreground service")
        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Location Service Running")
            .setContentText("Foreground service is running")
            .setSmallIcon(R.drawable.ic_launcher) // Make sure to replace this with an actual icon
            .build()
        startForeground(1, notification)
        Log.d("LocationForegroundService", "Foreground service started")
    }

    private fun setupLocationCallback() {
        Log.d("LocationForegroundService", "Setting up location callback")
        locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                for (location in locationResult.locations) {
                    sendLocationToReactNative(location.latitude, location.longitude)
                    Log.d("LocationForegroundService", "Location received: Latitude = ${location.latitude}, Longitude = ${location.longitude}")
                }
            }
        }
    }

    private fun startLocationUpdates() {
        Log.d("LocationForegroundService", "Starting location updates")
        val locationRequest = LocationRequest.Builder(5000) // 5 seconds
            .setMinUpdateIntervalMillis(5000)
            .setPriority(Priority.PRIORITY_HIGH_ACCURACY)
            .build()

        fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, Looper.getMainLooper())
        Log.d("LocationForegroundService", "Location updates requested")
    }

    private fun sendLocationToReactNative(latitude: Double, longitude: Double) {
         Log.d("LocationForegroundService", "Sending location to React Native: Latitude = $latitude, Longitude = $longitude")

        // Create a WritableMap to send data
        val params = WritableNativeMap().apply {
            putDouble("latitude", latitude)
            putDouble("longitude", longitude)
        }

        reactContext?.let {
            it.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("LocationUpdate", params) // Use the WritableMap as argument
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Log.d("LocationForegroundService", "Creating notification channel")
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Location Service Channel",
                NotificationManager.IMPORTANCE_LOW
            )
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
            Log.d("LocationForegroundService", "Notification channel created")
        }
    }

    fun setReactAppContext(context: ReactApplicationContext) {
        this.reactAppContext = context
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
