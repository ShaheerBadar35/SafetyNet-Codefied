package com.safetynet.app

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import android.os.Build

class CallServiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        // Initialization if needed
    }

    override fun getName(): String {
        return "CallServiceModule"
    }

    @ReactMethod
    fun startCallService(phoneNumber: String, promise: Promise) {
        try {

          //  val permission = android.Manifest.permission.CALL_PHONE
            //if (ActivityCompat.checkSelfPermission(reactApplicationContext, permission) != PackageManager.PERMISSION_GRANTED) {
             //   promise.reject("PERMISSION_DENIED", "CALL_PHONE permission is not granted")
              //  return
           // }

            val intent = Intent(reactApplicationContext, CallForegroundService::class.java).apply {
                putExtra("phone_number", phoneNumber)
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                reactApplicationContext.startForegroundService(intent)
            } else {
                reactApplicationContext.startService(intent)
            }
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
}
