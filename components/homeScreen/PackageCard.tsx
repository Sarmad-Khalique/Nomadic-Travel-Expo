// components/PackageCard.tsx
import { Image, Text, TouchableOpacity } from 'react-native';
import { Destination } from '../../types';

interface PackageCardProps {
  packageData: Destination;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageData }) => (
  <TouchableOpacity style={{ marginBottom: 20, marginRight: 15 }}>
    <Image source={{ uri: packageData.images[0]?.image }} style={{ width: 200, height: 120 }} />
    <Text>{packageData.name}</Text>
    <Text>{packageData.location}</Text>
    <Text>{packageData.price}</Text>
    <Text>{packageData.rating} Stars</Text>
  </TouchableOpacity>
);

export default PackageCard;
