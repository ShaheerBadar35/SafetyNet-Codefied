package com.safetynet.app

import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.*

class VersionServiceModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "VersionServiceModule"

    @ReactMethod
    fun startService(interval: Int, promise: Promise) {
        val intent = Intent(reactContext, VersionForegroundService::class.java)

        VersionForegroundService.reactContext = reactContext
        currentActivity?.startForegroundService(intent)

        promise.resolve("Service started successfully")
    }

    @ReactMethod
    fun stopService(promise: Promise) {
        val intent = Intent(reactContext, VersionForegroundService::class.java)
        reactContext.stopService(intent)
        promise.resolve("Service stopped successfully")
    }
}
