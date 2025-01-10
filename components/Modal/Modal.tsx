import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants/Colors";

interface IModalProps {
    visible: boolean;
    children: React.ReactNode;
    closeModal: () => void;
}

export const ModalComponent: React.FC<IModalProps> = ({
    visible,
    children,
    closeModal,
}) => {
    return (
        <Modal
            transparent
            animationType="slide"
            visible={visible}
            onRequestClose={closeModal}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        padding: 16,
                    }}
                >
                    {children}
                    <Pressable
                        onPress={closeModal}
                        style={{
                            marginTop: 16,
                            padding: 12,
                            borderRadius: 8,
                            alignItems: "center",
                            position: "absolute",
                            right: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.blue,
                                fontSize: 16,
                                textAlign: "right",
                            }}
                        >
                            Done
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};
