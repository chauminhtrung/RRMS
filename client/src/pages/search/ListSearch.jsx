import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ListSearch = ({ cityValue, keyword, districvalue }) => {
  const { t } = useTranslation()
  return (
    <div className="container mt-3" style={{ maxWidth: '1180px' }}>
      <ol className="breadcrumb-container breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <span>{t('trang-chu')}</span>
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/thue-phong-tro-ho-chi-minh-id-79">
            <span>{keyword || 'Tất cả'}</span>
          </Link>
        </li>
        <li className="breadcrumb-item breadcrumb-color">
          <span>{districvalue || 'Tất cả'}</span>
        </li>
      </ol>
      <h1
        style={{
          color: '#444',
          fontFamily: 'harmonia, Helvetica, Arial, sans-serif',
          fontWeight: '500',
          lineHeight: '125%',
          marginBottom: '10px',
          fontSize: '25px'
        }}>
        <b>
          {t('duoi-phong-tro')} {keyword || 'Tất cả'}
        </b>
      </h1>
      <p>
        <span className="item-filter">{t('ban-kinh-tim-kiem')}: 3 km</span>
      </p>
      <div className="warning">
        {t('khi-tim-phong-tro-gan')}{' '}
        <strong>
          {' '}
          {t('tim-phong-tro')} {cityValue || 'Tất cả'}{' '}
        </strong>{' '}
        {t('chung-toi-se-hien-thi')}
        <b> {t('cach-dia-diem')} 3km</b>. {t('vi-the-co-the-phong-tro-khong-thuoc')} <b>{t('cac-quan')}</b>{' '}
        {t('ban-dang-tim-kiem')}. {t('chu-y-ket-qua')}
        <b> {t('mau-do')}</b> {t('la-khong-thuoc-quan-huyen-ban-tim-kiem')}
      </div>
    </div>
  )
}

export default ListSearch
