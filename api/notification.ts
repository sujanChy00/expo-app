import { isAndroid, isweb } from "@/constants/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync(
  setDeviceToken: (token: string) => void
) {
  if (isweb) return;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    const isAsked = await AsyncStorage.getItem("isAsked");

    if (!isAsked || existingStatus == "undetermined") {
      await Notifications.requestPermissionsAsync();
      await AsyncStorage.setItem("isAsked", "true");
    }

    Notifications.getExpoPushTokenAsync({
      projectId: "cceab987-4404-441f-bdac-8fc01754df6a",
    }).then((token) => {
      setDeviceToken(token.data);
    });
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  if (isAndroid) {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
}
