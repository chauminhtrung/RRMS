import { Button, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import LanguageSelect from './LanguageSelect'
import ModeSelect from './ModeSelect'

const Option = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color: 'black'
        }}>
        <img src="https://www.svgrepo.com/show/13688/settings.svg" style={{ height: '25px', widt: '40px' }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}>
        <MenuItem>
          <LanguageSelect />
        </MenuItem>
        <MenuItem>
          <ModeSelect />
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Option
