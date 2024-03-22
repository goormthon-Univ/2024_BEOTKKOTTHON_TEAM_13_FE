import React, { useState, useEffect } from 'react';
import './ProductDetail.css';
import product from '../../assets/example.jpg'
import { ReactComponent as Back } from '../../assets/back.svg'
import { ReactComponent as Pick } from '../../assets/heart.svg'
import { ReactComponent as Next } from '../../assets/Next.svg'

export default function ProductDetail() {
    const [productData, setProductData] = useState({
        name: "강원도 햇감자 1kg 10개",
        price: null,
        seller: null,
        satisfaction: null,
        address: "서울특별시 서초구 반포대로 12",
        link: "https://coupang.com/qwejisdjf",
        content: "제주도 햇감자입니다.\n1kg에 40,000원이고, 직거래 강남역에서 가능합니다.",
        total: '4',
        remain: '1',
    });

    // useEffect(() => {
    //     // 백엔드에서 데이터 가져오는 비동기 함수
    //     fetchProductData().then(data => {
    //         setProductData({
    //             ...productData,
    //             price: data.price,
    //             seller: data.seller,
    //             satisfaction: data.satisfaction
    //         });
    //     }).catch(error => {
    //         console.error("Error fetching product data:", error);
    //     });
    // }, [productData]);

    // const fetchProductData = async () => {
    //     // 백엔드에서 상품 데이터를 가져오는 비동기 함수
    //     // 예를 들어, API 호출이나 데이터베이스 쿼리 등을 수행합니다.
    //     // 이 예시에서는 가짜 데이터를 반환합니다.
    //     return {
    //         name: "강원도 햇감자 1kg 10개",
    //         price: 4000,
    //         seller: "윤준영",
    //         satisfaction: 89,
    //         link: "https://coupang.com/qwejisdjf"
    //     };
    // };

    const handleBackClick = () => {
        // 이전 페이지로 돌아가는 기능 추가
    };

    const handlePickClick = () => {
        // 이전 페이지로 돌아가는 기능 추가
    };

    return (
        <div className="product-detail-container">

            <div className="product-header">
                <button className='back-button' onClick={handleBackClick}>
                    <Back />
                </button>
                <div className='product-name'>
                    {productData.name}
                </div>
            </div>

            <div className='image-container'>
                <img src={product} alt="Product" className="product-images" />
            </div>

            <div className='price-pick'>
                <span className='product-price'>
                    {productData.price !== null ? productData.price.toLocaleString() + "원" : "가격 불러오는 중..."}
                </span>
                <button className='back-button' onClick={handlePickClick}>
                    <Pick />
                </button>
            </div>

            <div className='product-seller'>
                <span className='seller-name'>
                    {productData.seller !== null ? productData.seller : "판매자 정보 불러오는 중..."}
                </span>
                <span className='product-satisfaction'>
                    만족도
                    <span className='satisfaction-num'>
                        {productData.satisfaction !== null ? productData.satisfaction + "%" : "불러오는 중..."}
                    </span>
                    <div className='product-satisfaction-bar'>
                        <div className='satisfaction-fill' style={{ width: `${productData.satisfaction}%` }}></div>
                    </div>
                </span>
            </div>
            <div className='product-link'>
                {productData.link}
            </div>
            <div className='product-content'>
                {productData.content}
            </div>
            <div className='product-address'>
                <p className='product-detail-address-text'>거래희망 장소</p>
                <div className='address-name'>
                    <div>
                        {productData.address}
                    </div>

                    <button className='look-map'>
                        <Next className='next-button-style' />
                    </button>
                </div>
            </div>

            <div className='people-container'>
                <div className='product-people-container'>
                    <div className='product-people'>
                        모집 인원 {productData.total}명
                    </div>
                    <div className='product-people'>
                        남은 인원 {productData.remain}명
                    </div>
                </div>
            </div>
            <div className='remaining-message'>
                {productData.remain}자리 밖에 안 남았어요!
            </div>

            <div className='product-sell-button-container'>
                <button className='product-sell-button'>
                    구매하기
                </button>
            </div>
        </div>


    );
}