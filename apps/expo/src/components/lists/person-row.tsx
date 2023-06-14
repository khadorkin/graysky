import { Text, TouchableHighlight, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { AppBskyActorDefs } from "@atproto/api";
import { TouchableHighlight as BottomSheetTouchableHighlight } from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";

interface Props {
  person: AppBskyActorDefs.ProfileView;
  onPress?: () => void;
  bottomSheet?: boolean;
}

export const PersonRow = ({ person, onPress, bottomSheet }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const Touchable = bottomSheet
    ? BottomSheetTouchableHighlight
    : TouchableHighlight;
  return (
    <Touchable
      onPress={() => {
        onPress?.();
        router.push(`/profile/${person.handle}`);
      }}
    >
      <View
        style={{ backgroundColor: theme.colors.card }}
        className="flex-row items-center px-4 py-2"
      >
        <Image
          source={{ uri: person.avatar }}
          className="mr-3 h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800"
          alt={person.displayName}
        />
        <View className="flex-1">
          {person.displayName && (
            <Text
              style={{ color: theme.colors.text }}
              className="text-base leading-5"
            >
              {person.displayName}
            </Text>
          )}
          <Text className="text-sm text-neutral-500 dark:text-neutral-400">
            @{person.handle}
          </Text>
        </View>
      </View>
    </Touchable>
  );
};
