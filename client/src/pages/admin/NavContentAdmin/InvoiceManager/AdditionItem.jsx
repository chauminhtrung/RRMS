import { useState } from 'react'

const AdditionItem = ({ index, onRemove }) => {
  const [additionValue, setAdditionValue] = useState('')
  const [additionReason, setAdditionReason] = useState('')
  const [isAddition, setIsAddition] = useState(true) // true for "Cộng", false for "Giảm"

  const handleAdditionChange = (event) => {
    setIsAddition(event.target.value === '1') // Cập nhật trạng thái dựa vào radio button
  }

  const handleValueChange = (event) => {
    setAdditionValue(event.target.value)
  }

  const handleReasonChange = (event) => {
    setAdditionReason(event.target.value)
  }

  return (
    <div className="row g-0 item mt-1 mb-1">
      <div className="col-3">
        <div className="middle-item border-right full">
          <div className="border-bottom center-item full p-2">
            <div className="form-check">
              <input
                data-format="numeric"
                className="form-check-input"
                type="radio"
                name={`addition_items[${index}]['addition']`}
                id={`addition_a_bill_${index}`}
                value="1"
                checked={isAddition}
                onChange={handleAdditionChange}
              />
              <label className="form-check-label" htmlFor={`addition_a_bill_${index}`}>
                Cộng [+]
              </label>
            </div>
          </div>
          <div className="center-item full p-2">
            <div className="form-check">
              <input
                data-format="numeric"
                className="form-check-input"
                type="radio"
                name={`addition_items[${index}]['addition']`}
                id={`addition_b_bill_${index}`}
                value="-1"
                checked={!isAddition}
                onChange={handleAdditionChange}
              />
              <label className="form-check-label" htmlFor={`addition_b_bill_${index}`}>
                Giảm [-]
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="col-8 border-right">
        <div className="row">
          <div className="col-12">
            <div className="form-floating">
              <input
                data-format="numeric"
                type="text"
                min="0"
                className="border-bottom form-control"
                name={`addition_items[${index}]['addition_value']`}
                placeholder="Số tiền cộng thêm hoặc giảm trừ"
                value={additionValue}
                onChange={handleValueChange}
                required
              />
              <label htmlFor={`addition_value_${index}`}>Số tiền (đ)</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <textarea
                rows="10"
                style={{ minHeight: '60px' }}
                className="form-control"
                name={`addition_items[${index}]['addition_reason']`}
                placeholder="Nhập lý do"
                value={additionReason}
                onChange={handleReasonChange}
                required
              />
              <label htmlFor={`addition_reason_${index}`}>Lý do</label>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-1"
        style={{
          borderRadius: '0 5px 5px 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffeee9',
        }}>
        <button
          className="btn delete"
          type="button"
          style={{ color: 'red', height: '100%' }}
          onClick={() => onRemove(index)}>
          Xóa
        </button>
      </div>
    </div>
  )
}

export default AdditionItem
