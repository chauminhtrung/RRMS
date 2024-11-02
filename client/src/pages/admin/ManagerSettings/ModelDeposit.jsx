import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useRef, useState } from 'react'

import { createContractTemplate, getContractTemplateById, updateContractTemplate } from '~/apis/apiClient'
import Swal from 'sweetalert2'

const ModelDeposit = ({ motel, username, templatecontractRouteId, fetchDataTemlateContract }) => {
  const editorRef = useRef()
  const [templatecontracts, setTemplatecontracts] = useState()

  useEffect(() => {
    console.log(templatecontracts)

    if (templatecontractRouteId !== 'Create') {
      fetchDataWhenEdit(templatecontractRouteId)
    } else {
      setTemplatecontracts({
        contractTemplateId: '',
        motelId: '',
        namecontract: '',
        templatename: '',
        sortOrder: '',
        content: ''
      })
    }
  }, [templatecontractRouteId]) // Thêm templatecontractRouteId vào dependency array

  const fetchDataWhenEdit = async (id) => {
    if (username) {
      try {
        const response = await getContractTemplateById(id)
        setTemplatecontracts(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTemplatecontracts((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // ham save
  const onSaveTemplate = (event) => {
    const form = document.getElementById('templatecontract-setting-info')
    if (!form.checkValidity()) {
      event.preventDefault()
      form.classList.add('was-validated')
    } else {
      if (username) {
        if (editorRef.current) {
          const content = editorRef.current.getContent()

          const contractTemplate = {
            motelId: motel.motelId,
            namecontract: document.getElementById('namecontract').value,
            templatename: document.getElementById('templatename').value,
            sortOrder: parseInt(document.getElementById('sortOrder').value, 10),
            content: content
          }

          console.log('Template to be saved:', contractTemplate)

          if (templatecontractRouteId === 'Create') {
            // Tạo mới nếu không có dữ liệu tồn tại
            createContractTemplate(contractTemplate)
              .then((response) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Thông báo',
                  text: 'Contract Template created successfully!'
                })
                setTemplatecontracts(response)
                fetchDataTemlateContract()
              })
              .catch((error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Thông báo',
                  text: 'Error creating contract template.'
                })
                console.error('Error creating template:', error)
              })
          } else {
            // Cập nhật nếu đã có dữ liệu
            updateContractTemplate(templatecontractRouteId, contractTemplate)
              .then((response) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Thông báo',
                  text: 'Contract Template updated successfully!'
                })
                setTemplatecontracts(response)
                fetchDataTemlateContract()
              })
              .catch((error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Thông báo',
                  text: 'Error updating contract template.'
                })
                console.error('Error updating template:', error)
              })
          }
        }
      }
    }
  }

  return (
    <div>
      <div
        className="modal fade"
        data-bs-backdrop="static"
        id="contractTemplateModal"
        tabIndex="-1"
        aria-modal="true"
        aria-hidden="true"
        role="dialog"
        style={{ display: 'none' }}>
        <div className="modal-dialog modal-dialog-centered modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <div
                style={{
                  marginRight: '15px',
                  outline: '0',
                  boxShadow: '0 0 0 .25rem rgb(112 175 237 / 16%)',
                  opacity: '1',
                  borderRadius: '100%',
                  width: '36px',
                  height: '36px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  backgroundColor: 'rgb(111 171 232)'
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-file-text">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h5 className="modal-title">Tạo mẫu hợp đồng mới</h5>
              <div style={{ margin: '-.5rem -.5rem -.5rem auto' }}>
                <button type="button" className="btn btn-secondary m-1" data-bs-dismiss="modal">
                  Đóng
                </button>
                <button
                  type="button"
                  id="submit-contract-template-form"
                  className="btn btn-primary"
                  onClick={onSaveTemplate}>
                  Tạo mẫu
                </button>
              </div>
            </div>
            <div className="modal-body">
              <form method="POST" className="needs-validation" id="templatecontract-setting-info" noValidate>
                <input type="hidden" name="_token" value="UHzAXFSkKsIc0ue0DDZLi3EGz63beVebygqBgiKV" />
                <div className="hide-when-edit">
                  <div className="title-item-small" style={{ marginTop: '-10px' }}>
                    <b>Chọn nhà trọ</b>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 hide-when-edit">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="blocks_id[]"
                        id="blocks_id_6891"
                        value="6891"
                        checked
                      />
                      <label className="form-check-label" htmlFor="blocks_id_6891">
                        <b>{motel ? motel.motelName : <></>}</b>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-2">
                  <div className="row g-2">
                    <div className="col-4 mt-2">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="templatename"
                          id="templatename"
                          placeholder="vd: Mẫu 1, Mẫu 2..."
                          required
                          value={templatecontracts ? templatecontracts.templatename : <></>}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="template_name">
                          Tên mẫu hợp đồng <span style={{ color: 'red' }}>*</span>
                        </label>
                      </div>
                      <div className="invalid-feedback">Vui lòng nhập tên mẫu hợp đồng</div>
                    </div>

                    <div className="col-4 mt-2" id="collapseSort">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="sortOrder"
                          id="sortOrder"
                          placeholder="vd:1,2,3..."
                          required
                          value={templatecontracts ? templatecontracts.sortOrder : <></>}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="template_sort">Số thứ tự ưu tiên</label>
                      </div>
                    </div>

                    <div className="col-4 mt-2">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="namecontract"
                          id="namecontract"
                          placeholder="HỢP ĐỒNG CHO THUÊ PHÒNG TRỌ ..."
                          required
                          value={templatecontracts ? templatecontracts.namecontract : <></>}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="name">
                          Tên hợp đồng <span style={{ color: 'red' }}>*</span>
                        </label>
                      </div>
                      <div className="invalid-feedback">Vui lòng nhập tên hợp đồng</div>
                    </div>
                  </div>
                </div>
                <textarea
                  type="text"
                  rows="10"
                  style={{ minHeight: '100px', display: 'none' }}
                  className="form-control"
                  name="content"
                  id="content-contract"
                  aria-hidden="true"></textarea>
                <Editor
                  apiKey="bj3v769fvuxhilkoz8g48ituulf3bl6d7bi27ji6fb1k7f2w"
                  onEditorChange={(evt, editor) => {
                    editorRef.current = editor
                  }}
                  init={{
                    plugins: [
                      'anchor',
                      'autolink',
                      'charmap',
                      'codesample',
                      'emoticons',
                      'image',
                      'link',
                      'lists',
                      'media',
                      'searchreplace',
                      'table',
                      'visualblocks',
                      'wordcount',
                      'checklist',
                      'mediaembed',
                      'casechange',
                      'export',
                      'formatpainter',
                      'pageembed',
                      'a11ychecker',
                      'tinymcespellchecker',
                      'permanentpen',
                      'powerpaste',
                      'advtable',
                      'advcode',
                      'editimage',
                      'advtemplate',
                      'ai',
                      'mentions',
                      'tinycomments',
                      'tableofcontents',
                      'footnotes',
                      'mergetags',
                      'autocorrect',
                      'typography',
                      'inlinecss',
                      'markdown'
                    ],
                    toolbar:
                      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                      { value: 'First.Name', title: 'First Name' },
                      { value: 'Email', title: 'Email' }
                    ],
                    height: '1000px',
                    ai_request: (request, respondWith) =>
                      respondWith.string(() => Promise.reject('See docs to implement AI Assistant'))
                  }}
                  initialValue={templatecontracts ? templatecontracts.content : <></>}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelDeposit
