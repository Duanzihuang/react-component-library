import { FC, useState, ChangeEvent, ReactElement, useEffect, useRef } from 'react'
import { Input, InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import { useDebounce, useClickOutside } from './hook'
import classNames from 'classnames'

interface DataSourceObject {
    name: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    // fetchSuggestions: (str: string) => string[]
    // onSelect?: (item: string) => void
    // renderOption?: (item: string) => ReactElement
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType>
    onSelect?: (item: DataSourceType) => void
    renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props

    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    // 键盘事件中高亮索引
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const [isEnter, setIsEnter] = useState(false)
    // 点击组件外部关闭搜索结果列表
    const target = useRef<HTMLDivElement>(null)
    useClickOutside(target, () => {
        setSuggestions([])
    })

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.name)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.name
    }
    const generateDropdown = () => {
        return (
            <ul className="viking-suggestion-list">
                {suggestions.map((item, index) => {
                    const cnames = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    })
                    return (
                        <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                            {renderTemplate(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }

    const debounceValue = useDebounce(inputValue, 500)

    useEffect(() => {
        if (debounceValue && !isEnter) {
            const results = fetchSuggestions(debounceValue)
            if (results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    console.log('---triggered---', data)
                    setHighlightIndex(-1)
                    setLoading(false)
                    setSuggestions(data as any)
                })
            } else {
                setSuggestions(results)
            }
        } else {
            setSuggestions([])
        }
    }, [setIsEnter, debounceValue])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setIsEnter(false)
        setInputValue(value)
    }

    // 设置高亮的索引
    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) index = suggestions.length - 1

        setHighlightIndex(index)
    }

    // 键盘处理事件
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13: // 回车
                setIsEnter(true)
                handleSelect(suggestions[highlightIndex])
                break;

            case 38: // 向上
                highlight(highlightIndex - 1)
                break;

            case 40: // 向下
                highlight(highlightIndex + 1)
                break;

            case 27:
                setSuggestions([])
                break;

            default:
                break;
        }
    }

    return (
        <div className='viking-auto-complete' ref={target}>
            <Input value={inputValue} onChange={handleChange} onKeyDown={onKeyDown} {...restProps} />
            {loading && (
                <ul>
                    <Icon icon='spinner' spin />
                </ul>
            )}
            {suggestions.length > 0 && generateDropdown()}
        </div>
    )
}
