import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';


const CameraPage = () => {

    const devices = useCameraDevices()
    const device = devices.back

    if (device == null) return <LoadingView />
    return (
    <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
    />
    )
}

export default CameraPage;