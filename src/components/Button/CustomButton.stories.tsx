import React from 'react'
import '../../styles/index.scss'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { withInfo } from '@storybook/addon-info'

import Button from './button'

const styles: React.CSSProperties = {
    textAlign: 'center'
}

const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

const defaultButton = () => (
    <Button onClick={action('button click')}>default button</Button>
)

const buttonWithSize = () => (
    <>
        <Button size='lg'>large button</Button>
        <Button size='sm'>small button</Button>
    </>
)

const buttonWithType = () => (
    <>
        <Button btnType='primary'>primary button</Button>
        <Button btnType='danger'>danger button</Button>
        <Button btnType='link' href='https://www.google.com'>
            link button
        </Button>
    </>
)

storiesOf('CustomButton', module)
    // .addDecorator(CenterDecorator)
    // .addDecorator(withInfo)
    // .addParameters({
    //     info: {
    //         text: `
    //         ## 标题呀
    //         ~~~js
    //         const a = 'hello'
    //         ~~~
    //     `,
    //         inline: true
    //     }
    // })
    .add('默认 Button', defaultButton)
    // .add('不同尺寸的 Button', buttonWithSize, { info: { inline: false } })
    .add('不同尺寸的 Button', buttonWithSize)
    .add('不同类型的 Button', buttonWithType)
