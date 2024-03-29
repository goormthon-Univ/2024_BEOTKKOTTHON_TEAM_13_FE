import React, { useState, useEffect, useContext } from 'react';
import CustomMarker from '../../assets/Marker.svg'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Back } from '../../assets/back.svg'
import { MyContext } from '../../components/MyContextProvider/MyContextProvider';
import axios from 'axios'; // axios 추가
import { useLocation } from 'react-router-dom';


export default function CheckLocationPage() {
    const [map, setMap] = useState();
    const [marker, setMarker] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const { postAddress, setPostAddress } = useContext(MyContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { address, latitude, longitude } = location.state;

    const goBack = () => {
        setMap(null);
        navigate(-1); // 뒤로가기
    }

   
    // const fetchHCode = (query) => {
    //     axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${query}`, {
    //         headers: {
    //             Authorization: "KakaoAK"
    //         },
    //     })
    //         .then(response => {
    //             if (response.data.meta.total_count > 0) {
    //                 const hCode = response.data.documents[0].address.h_code; // 행정동 코드
    //                 const BCode = response.data.documents[0].address.b_code;
    //                 console.log('행정동 코드:', hCode);
    //                 console.log('법정동 코드:', BCode);
    //                 // 여기서 필요한 작업 수행
    //             } else {
    //                 console.error('No results found for the address query:', query);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching hCode:', error);
    //         });
    // };
    // 1) 카카오맵 불러오기
    useEffect(() => {
        if (!window.kakao) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services&t=${new Date().getTime()}`;

            document.head.appendChild(script);

            script.onload = () => {
                window.kakao.maps.load(() => {
                    const container = document.getElementById('map');
                    const options = {
                        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                        level: 3,
                    };

                    setMap(new window.kakao.maps.Map(container, options));
                    setMarker(new window.kakao.maps.Marker());
                });
            };

            return () => {
                document.head.removeChild(script);
            };
        }
    }, []);

    // 2) 최초 렌더링 시에는 제외하고 map이 변경되면 실행
    useEffect(() => {
        if (map) {
            // 사용자의 현재 위치를 가져옴
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const userPosition = new window.kakao.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    );

                    // 사용자 위치를 원으로 표시
                    const circle1 = new window.kakao.maps.Circle({
                        center: userPosition,
                        radius: 6,
                        strokeWeight: 0,
                        fillColor: '#0085FF',
                        fillOpacity: 1,
                        shadow: {
                            color: '#000',
                            blur: 5,
                            offsetX: 3,
                            offsetY: 3,
                            opacity: 0.25
                        }
                    });

                    const circle2 = new window.kakao.maps.Circle({
                        center: userPosition,
                        radius: 12,
                        strokeWeight: 0,
                        fillColor: '#007bff',
                        fillOpacity: 0.2
                    });

                    // 원을 지도에 추가
                    circle1.setMap(map);
                    circle2.setMap(map);

                    // 사용자 위치를 지도의 중심으로 설정
                    map.setCenter(userPosition);
                });
            }
        }
    }, [map]);

    useEffect(() => {
        if (map && latitude && longitude) {
            const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
            console.log(latitude, longitude);

            if (marker) {
                marker.setPosition(markerPosition);
            } else {
                const markerImage = new window.kakao.maps.MarkerImage(
                    CustomMarker, // 마커 이미지 경로
                    new window.kakao.maps.Size(33, 40), // 마커 이미지 크기
                );

                const newMarker = new window.kakao.maps.Marker({
                    map: map,
                    position: markerPosition,
                    image: markerImage
                });

                setMarker(newMarker);
            }

            // map.panTo(markerPosition);
        }
    }, [map, latitude, longitude]);
   






    return (
        <div>
            <div id="map" style={{ width: '100%', height: '100vh' }}></div>
            <button className='seletctmap-back-button' onClick={goBack}>
                <Back />
            </button>
                <div className="modal">
                    <div className="modal-content">
                        <p className='modal-address'>{address}</p>
                    </div>
                </div>
            
        </div>
    );
}
