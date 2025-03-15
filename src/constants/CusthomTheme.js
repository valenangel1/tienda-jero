import { DefaultTheme } from "@react-navigation/native";
import colors from "./colors";

const CusthomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.gradientePrimario,
        card: colors.variante1,
        text: colors.default,
        borde: colors.thin,
        Notification: colors.exito
    }
}

export default CusthomTheme