import { colors } from "../src/theme/colors"
import { typography } from "../src/theme/typography"


const regular ={
    fontFamily:typography.regular,
    fontSize:16,
    color:colors.black
}
const regularSmall ={
    fontFamily:typography.regular,
    fontSize:14,
    color:colors.black
}

const regularBold ={
    fontFamily:typography.bold,
    fontSize:16,
    color:colors.black
}
const uniqBold={
    fontFamily:typography.uniqBold,
    // color:colors.black
}

export const TextPresets={
    default:regular,
    regularSmall,
    regularBold:regularBold,
    uniqBold:uniqBold,
    h1:{...uniqBold,fontSize:32},
    h2:{...uniqBold,fontSize:28},
    h3:{...uniqBold,fontSize:24},
    h4:{...uniqBold,fontSize:18},
    h5:{...uniqBold,fontSize:14},
    small:{...uniqBold,fontSize:12}
}