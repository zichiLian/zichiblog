import 'react'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'meting-js': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                server?: string
                type?: string
                id?: string | number
                'data-lrc-type'?: number
                theme?: string
            },
                HTMLElement
            >
        }
    }

    interface Window {
        MetingJS: {
            init: () => void
        }
    }
}