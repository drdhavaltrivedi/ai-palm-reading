import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack } from "./HomeStack";
import { HistoryStack } from "./HistoryStack";
import { ProfileStack } from "./ProfileStack";
import type { MainTabParamList } from "../../types/navigation";
import { useAppTheme } from "../theme/useAppTheme";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
          height: 80, // Taller tab bar
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hand-left-outline" size={24} color={color} />
          ),
          tabBarAccessibilityLabel: "Home, new reading",
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryStack}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={24} color={color} />
          ),
          tabBarAccessibilityLabel: "Reading history",
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
          tabBarAccessibilityLabel: "Profile and settings",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
