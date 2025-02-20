package com.safetynet.app

import android.content.Intent
import android.content.Context
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.modules.core.DeviceEventManagerModule
import androidx.core.content.ContextCompat

class BackgroundServiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val reactContext = reactContext

    override fun getName(): String {
        return "BackgroundServiceModule"
    }

    @ReactMethod
    fun startService(promise: Promise) {
        try {
            val intent = Intent(reactContext, BackgroundService::class.java)
            // For Android 8.0 (API level 26) and above, we must use ContextCompat.startForegroundService()
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                ContextCompat.startForegroundService(reactContext, intent)
            } else {
                reactContext.startService(intent)
            }
            promise.resolve("Service started successfully")
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    @ReactMethod
    fun stopService(promise: Promise) {
        try {
            val intent = Intent(reactContext, BackgroundService::class.java)
            reactContext.stopService(intent)
            promise.resolve("Service stopped successfully")
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    fun sendEvent(eventName: String, params: Map<String, Any?>) {
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        }
    }
}
