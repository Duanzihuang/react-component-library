import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'

interface LakerPlayerProps {
    name: string
    number: number
}

interface GithubUserProps {
    login: string
    url: string
    avatar_url: string
}

const SimpleComplete = () => {
    const lakers = [
        'bradley',
        'pope',
        'caruso',
        'cook',
        'cousins',
        'james',
        'AD',
        'green',
        'howard',
        'kuzma',
        'McGee',
        'rando'
    ]

    const lakersWithNumber = [
        { name: 'bradley', number: 11 },
        { name: 'pope', number: 1 },
        { name: 'caruso', number: 4 },
        { name: 'cook', number: 2 },
        { name: 'cousins', number: 15 },
        { name: 'james', number: 23 },
        { name: 'AD', number: 3 },
        { name: 'green', number: 14 },
        { name: 'howard', number: 39 },
        { name: 'kuzma', number: 0 }
    ]

    // const handleFetch = (query: string) => {
    //     return lakers.filter(value => name.includes(query))
    // }

    // const handleFetch = (query: string) => {
    //     return lakersWithNumber.filter(player => player.name.includes(query))
    // }

    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({ items }) => {
                return items
                    .slice(0, 10)
                    .map((item: any) => ({ name: item.login, ...item }))
            })
    }

    // const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
    //     return (
    //         <>
    //             <h6>Name: {item.name}</h6>
    //             <p>Number：{item.number}</p>
    //         </>
    //     )
    // }
    const renderOption = (item: DataSourceType) => {
        const itemWithGithub = item as DataSourceType<GithubUserProps>
        return (
            <>
                <h6>Name: {itemWithGithub.name}</h6>
                <p>url：{itemWithGithub.url}</p>
            </>
        )
    }

    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={item => action('selected')}
            renderOption={renderOption}
        />
    )
}

storiesOf('AutoComplete Component', module).add('AutoComplete', SimpleComplete)
