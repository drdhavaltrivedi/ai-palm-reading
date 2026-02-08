import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { HomeStack } from "./HomeStack";
import { HistoryStack } from "./HistoryStack";
import { ProfileStack } from "./ProfileStack";
import type { MainTabParamList } from "../../types/navigation";

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text className={focused ? "text-accent" : "text-muted"}>
      {label}
    </Text>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#12121a", borderTopColor: "#27272a" },
        tabBarActiveTintColor: "#8b7355",
        tabBarInactiveTintColor: "#6b7280",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Home" focused={focused} />,
          tabBarAccessibilityLabel: "Home, new reading",
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryStack}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="History" focused={focused} />,
          tabBarAccessibilityLabel: "Reading history",
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Profile" focused={focused} />,
          tabBarAccessibilityLabel: "Profile and settings",
        }}
      />
    </Tab.Navigator>
  );
}
