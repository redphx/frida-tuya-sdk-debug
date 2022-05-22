# Debug Tuya SDK with Frida

I use this script mainly for debugging Tuya BLE protocol for developing [redphx/python-tuya-ble](https://github.com/redphx/python-tuya-ble).

## Features
- Enable global logging.
- Enable Bluetooth logging.
- Disable SSL pinning.
- Support most apps using Tuya SDK: Tuya, Smart Life, Adaprox...

## Requirements
- A Rooted Android phone. I'm using a POCO F3.
- Or you can use an Android Emulator. I tested wit [Genymotion](https://www.genymotion.com/) and it worked (you might not be able to control BLE devices with it without using a hub).

## Preparation
1. Install the app you want to debug on your phone.

3. Install [Frida CLI](https://frida.re/docs/installation/).  
  ```
  pip install frida-tools
  ```

3. Run `frida --v` to get CLI's version. Visit [Frida's Release page](https://github.com/frida/frida/releases) and download the correct version for `frida-server`. (Ex: 
`frida-server-[VERSION]-android-[ARCH].xz`)

4. [Install frida-server](https://frida.re/docs/android/) on your rooted Android phone. Make sure you have Android's `adb` installed.

## Usage:

1. Pair your PC/Mac/Linux with your phone using ADB.

2. Run Frida script `debug.js`:
  ```
  frida --no-pause -U -f [APP_PACKAGE_NAME] -l debug.js
  ```
  with `[APP_PACKAGE_NAME]` is package name of the app you want to debug. For example: Tuya's package name is `com.tuya.smart`.
  
3. Use [Logcat Reader](https://play.google.com/store/apps/details?id=com.dp.logcatapp) to view and export logs. Remember to filter logs with your app's PID for better results.

4. Try to interact with your device. If you see something like this in logcat then you did correctly (this is the results from testing BLE device).

![image](https://user-images.githubusercontent.com/96280/169678497-03d6a9c2-6edb-4ee0-866f-6019a35e6e7e.png)


## Tested apps
- Tuya Smart 4.0.2
- Smart Life 4.0.2
- Adaprox Home 4.2.00
