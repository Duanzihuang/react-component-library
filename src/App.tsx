import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition/transition'
import { useState } from 'react'
import Upload from './components/Upload/index-test'

library.add(fas)

function App () {
  const [show, setShow] = useState(false)
  return (
    <div className='App'>
      <Menu
        defaultIndex='0'
        onSelect={index => alert(index)}
        defaultOpenSubMenus={['2']}
      >
        {/* <Menu defaultIndex='0' onSelect={index => alert(index)} mode='horizontal'> */}
        <MenuItem index='0'>menu1</MenuItem>
        <MenuItem index='1' disabled>
          menu2
        </MenuItem>
        {/* 子Menu */}
        <SubMenu index='2' title='mens'>
          <MenuItem>color1</MenuItem>
          <MenuItem>color2</MenuItem>
          <MenuItem>color3</MenuItem>
        </SubMenu>
        <MenuItem index='3'>menu3</MenuItem>
      </Menu>
      {/* <Button onClick={() => console.log('---我是按钮---')}>我是按钮</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        我是按钮
      </Button>
      <Button autoFocus btnType={ButtonType.Link} href='http://www.baidu.com'>
        Baidu Link
      </Button>
      <Button
        className='custom'
        btnType={ButtonType.Link}
        disabled
        href='http://www.baidu.com'
      >
        Baidu Link
      </Button> */}
      {/* <Icon icon='arrow-down' theme='success' size='10x' /> */}
      <Button size='lg' onClick={() => setShow(!show)}>
        Toggle
      </Button>
      <Transition in={show} timeout={300} animation='zoom-in-left'>
        <div>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
        </div>
      </Transition>
      <Transition in={show} timeout={300} animation='zoom-in-top' wrapper>
        <Button btnType='primary' size='lg'>
          A Large Button
        </Button>
      </Transition>
      <hr />
      <Upload />
    </div>
  )
}

export default App
