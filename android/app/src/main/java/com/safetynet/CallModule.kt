package com.safetynet.app

import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat // Add this import

class CallModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        // Optionally add an activity event listener if needed
    }

    override fun getName(): String {
        return "CallModule"
    }

    @ReactMethod
    fun makeCall(phoneNumber: String, promise: Promise) {
        val reactContext = reactApplicationContext
        val activity = currentActivity
        
        // Check for CALL_PHONE permission
        if (ContextCompat.checkSelfPermission(reactContext, android.Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
            promise.reject("PERMISSION_DENIED", "Permission to make phone calls is denied")
            return
        }
        
        if (activity != null) {
            try {
                // Create an Intent to make a call
                val callIntent = Intent(Intent.ACTION_CALL).apply {
                    data = Uri.parse("tel:$phoneNumber")
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) // Add this flag for Android 34 compatibility
                }
                activity.startActivity(callIntent)
                promise.resolve(null)
            } catch (e: SecurityException) {
                // Handle exception if permission is not granted
                promise.reject("SECURITY_EXCEPTION", "Failed to make a call", e)
            } catch (e: Exception) {
                // Handle other exceptions
                promise.reject("ERROR", "Failed to make a call", e)
            }
        } else {
            promise.reject("ACTIVITY_NOT_FOUND", "Activity not found")
        }
    }
}
