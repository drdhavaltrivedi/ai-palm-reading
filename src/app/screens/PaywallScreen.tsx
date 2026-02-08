import React from "react";
import { View, Text } from "react-native";
import { Button } from "../components/Button";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ProfileStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<ProfileStackParamList, "Paywall">;

export function PaywallScreen({ navigation }: Props) {
  return (
    <View
      className="flex-1 bg-background px-6 justify-center"
      accessibilityLabel="Premium options"
    >
      <Text
        className="text-2xl text-white font-serif mb-4"
        accessibilityRole="header"
      >
        Premium
      </Text>
      <Text className="text-muted mb-8">
        Deep analysis, compatibility, monthly refresh. Stripe / IAP ready.
      </Text>
      <Button
        title="Close"
        variant="secondary"
        onPress={() => navigation.goBack()}
        accessibilityLabel="Close premium"
      />
    </View>
  );
}
