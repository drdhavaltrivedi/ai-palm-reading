import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";
import { PalmReadingChat } from "../services/gemini";
import { useAppTheme } from "../theme/useAppTheme";

type Props = NativeStackScreenProps<HomeStackParamList, "Chat">;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function ChatScreen({ route, navigation }: Props) {
  const { colors, isDark } = useAppTheme();
  const { reading, imageUri } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatInstance, setChatInstance] = useState<PalmReadingChat | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Initialize chat
    const initChat = async () => {
      const chat = new PalmReadingChat(reading, imageUri);
      await chat.initialize();
      setChatInstance(chat);

      // Add welcome message
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "I'm here to answer your questions about your palm reading. Ask me anything about what I've discovered in your palm!",
          timestamp: new Date(),
        },
      ]);
    };

    initChat();
  }, [reading, imageUri]);

  const handleSend = async () => {
    if (!inputText.trim() || !chatInstance || isLoading) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await chatInstance.sendMessage(userMessage.content);

      const assistantMessage: Message = {
        id: `msg_${Date.now()}_assistant`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: `msg_${Date.now()}_error`,
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInputText(suggestion);
  };

  const suggestedQuestions = chatInstance?.getSuggestedQuestions() || [];

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Oracle Chat</Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
            {reading.handSide} hand • {reading.isDominant ? "Dominant" : "Non-dominant"}
          </Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageRow,
              message.role === "user" ? styles.userRow : styles.assistantRow,
            ]}
          >
            {message.role === "assistant" && (
               <View style={[styles.avatarContainer, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
                 <Ionicons name="sparkles" size={16} color={colors.accent} />
               </View>
            )}
            
            <View
              style={[
                styles.messageBubble,
                message.role === "user" 
                  ? [styles.userBubble, { backgroundColor: colors.accent }] 
                  : [styles.assistantBubble, { backgroundColor: colors.surface, borderColor: colors.border }],
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.role === "user" 
                    ? [styles.userText, { color: isDark ? colors.background : "#1F2937" }] 
                    : [styles.assistantText, { color: colors.textSecondary }],
                ]}
              >
                {message.content}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  message.role === "user" 
                    ? [styles.userTime, { color: isDark ? "rgba(5, 4, 10, 0.6)" : "rgba(31, 41, 55, 0.6)" }] 
                    : [styles.assistantTime, { color: colors.textDim }],
                ]}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </View>
        ))}

        {isLoading && (
          <View style={[styles.messageRow, styles.assistantRow]}>
             <View style={[styles.avatarContainer, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
                 <Ionicons name="sparkles" size={16} color={colors.accent} />
             </View>
            <View style={[styles.messageBubble, styles.assistantBubble, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <ActivityIndicator size="small" color={colors.accent} />
            </View>
          </View>
        )}

        {/* Suggested Questions */}
        {messages.length <= 1 && suggestedQuestions.length > 0 && (
          <View style={[styles.suggestionsContainer, { borderColor: colors.border }]}>
            <Text style={[styles.suggestionsTitle, { color: colors.muted }]}>Ask the Oracle:</Text>
            {suggestedQuestions.slice(0, 3).map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.suggestionChip, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={14} color={colors.accent} style={{marginRight: 6}} />
                <Text style={[styles.suggestionText, { color: colors.textPrimary }]}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border }]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about your destiny..."
          placeholderTextColor={colors.muted}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton, 
            { backgroundColor: colors.accent },
            (!inputText.trim() || isLoading) && { backgroundColor: colors.surfaceElevated, opacity: 0.5 }
          ]}
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <Ionicons name="send" size={20} color={isDark ? colors.background : "#1F2937"} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  userRow: {
    justifyContent: "flex-end",
  },
  assistantRow: {
    justifyContent: "flex-start",
  },
  avatarContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  userText: {
    fontWeight: "500",
  },
  assistantText: {
    // handled in render
  },
  messageTime: {
    fontSize: 11,
    alignSelf: "flex-end",
  },
  userTime: {
    // handled in render
  },
  assistantTime: {
    // handled in render
  },
  suggestionsContainer: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
  },
  suggestionsTitle: {
    fontSize: 14,
    marginBottom: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  suggestionChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
    borderWidth: 1,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    // Unused
  },
});
