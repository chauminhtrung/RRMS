const ListSearch = () => {
  return (
    <div className="container mt-3" style={{ maxWidth: '1180px' }}>
      <ol className="breadcrumb-container breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">
            <span>Trang chủ</span>
          </a>
        </li>
        <li className="breadcrumb-item">
          <a href="/thue-phong-tro-ho-chi-minh-id-79">
            <span>Hồ Chí Minh</span>
          </a>
        </li>
        <li className="breadcrumb-item breadcrumb-color">
          <span>Quận 1</span>
        </li>
      </ol>
      <h1
        style={{
          color: '#444',
          fontFamily: 'harmonia, Helvetica, Arial, sans-serif',
          fontWeight: '500',
          lineHeight: '125%',
          marginBottom: '10px',
          fontSize: '25px',
        }}>
        <b>Tìm phòng trọ gần Quận 1</b>
      </h1>
      <p>
        <span className="item-filter">Bán kính tìm kiếm: 3 km</span>
      </p>
      <div className="warning">
        Khi tìm phòng trọ gần <strong>Tìm phòng trọ gần Quận 1</strong> chúng tôi sẽ hiển thị các Phòng trọ, nhà trọ
        cách địa đó <b>3km</b>, Vì thế có thể phòng trọ không thuộc <b>các quận</b> bạn đang tìm kiếm. Chú ý kết quả để{' '}
        <b>màu đỏ</b> là không thuộc quận / huyện bạn tìm kiếm.
      </div>
    </div>
  )
}

export default ListSearch
