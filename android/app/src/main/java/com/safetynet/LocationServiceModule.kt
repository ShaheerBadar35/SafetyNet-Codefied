package com.safetynet.app

import android.content.Context
import android.content.Intent
import android.os.Build
import android.Manifest
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.content.pm.PackageManager

class LocationServiceModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "LocationServiceModule"

    @ReactMethod
    fun startLocationService(promise: Promise) {
        if (ContextCompat.checkSelfPermission(reactContext, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            promise.reject("PERMISSION_DENIED", "ACCESS_FINE_LOCATION permission is not granted")
            return
        }

        val intent = Intent(reactContext, LocationForegroundService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            reactContext.startForegroundService(intent)
        } else {
            reactContext.startService(intent)
        }

        LocationForegroundService.reactContext = reactContext
        promise.resolve("Location service started successfully")
    }

    @ReactMethod
    fun stopLocationService(promise: Promise) {
        val intent = Intent(reactContext, LocationForegroundService::class.java)

        try {
            reactContext.stopService(intent)
            promise.resolve("Location service stopped successfully")
        } catch (e: Exception) {
            promise.reject("SERVICE_STOP_ERROR", "Failed to stop location service: ${e.message}")
        }
    }
}
