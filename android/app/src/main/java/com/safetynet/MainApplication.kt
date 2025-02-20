package com.safetynet.app

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.facebook.react.bridge.ReactApplicationContext
import android.content.Intent
import android.app.ActivityManager
import android.content.Context
import com.safetynet.app.LocationServicePackage
import com.safetynet.app.FunctionServicePackage
import com.safetynet.app.VersionServicePackage
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.ReactContext
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build

class MainApplication : Application(), ReactApplication {

    private lateinit var locationService: LocationForegroundService
    private lateinit var reactContext: ReactApplicationContext

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> {
                // Get the auto-linked packages
                val packages = PackageList(this).packages

                // Add manually linked packages
                packages.add(CallPackage())
                packages.add(SmsPackage())
                packages.add(BackgroundServicePackage())
                packages.add(VoiceRecognitionPackage())
                packages.add(CallServicePackage())
                packages.add(SmsServicePackage())
                packages.add(KeywordServicePackage())
               // packages.add(ScreenStatePackage())
                packages.add(LocationServicePackage())
               packages.add(ScreenServicePackage())
               packages.add(FunctionServicePackage())
               packages.add(VersionServicePackage())
                return packages
            }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    fun obtainLocationService(): LocationForegroundService {
        if (!::locationService.isInitialized) {
            locationService = LocationForegroundService()
        }
        return locationService
    }

    fun assignReactContext(context: ReactApplicationContext) {
        this.reactContext = context

           // Start the LocationForegroundService only if it's not already running
        if (!isMyServiceRunning(LocationForegroundService::class.java)) {
            val serviceIntent = Intent(this, LocationForegroundService::class.java)
            startService(serviceIntent)
        }
        (getSystemService(LocationForegroundService::class.java) as? LocationForegroundService)?.setReactAppContext(reactContext)

        if (!isMyServiceRunning(FunctionForegroundService::class.java)) {
            val serviceIntent = Intent(this, FunctionForegroundService::class.java)
            startService(serviceIntent)
        }

         if (!isMyServiceRunning(VersionForegroundService::class.java)) {
            val serviceIntent = Intent(this, VersionForegroundService::class.java)
            startService(serviceIntent)
        }

        // Assign React context to the service
        (getSystemService(FunctionForegroundService::class.java) as? FunctionForegroundService)?.setReactAppContext(reactContext)
        (getSystemService(VersionForegroundService::class.java) as? VersionForegroundService)?.setReactAppContext(reactContext)
        
    }

  

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "default_channel_id"
            val channelName = "Default Channel"
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(channelId, channelName, importance).apply {
                description = "Notifications for general updates"
            }
            val notificationManager =
                getSystemService(NotificationManager::class.java)
            notificationManager?.createNotificationChannel(channel)
        }

        reactNativeHost.reactInstanceManager.addReactInstanceEventListener(object : ReactInstanceManager.ReactInstanceEventListener {
            override fun onReactContextInitialized(context: ReactContext) {
                assignReactContext(context as ReactApplicationContext)
            }
        })
        
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            load()
        }
    }

    private fun isMyServiceRunning(serviceClass: Class<*>): Boolean {
        val manager = getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        for (service in manager.getRunningServices(Int.MAX_VALUE)) {
            if (serviceClass.name == service.service.className) {
                return true
            }
        }
        return false
    }
}
