import { ImagePropertiesSourceOptions } from 'react-native';

const imagePath = '../../assets/icons/';

const Images = {
    deleteIcon: <ImagePropertiesSourceOptions>require(imagePath + 'delete_icon.png'),
    starsIcon: <ImagePropertiesSourceOptions>require(imagePath + 'stars_icon.png')
};
export default Images;