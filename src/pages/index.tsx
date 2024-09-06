import { Button } from 'antd/lib'

export default function Home() {
    return (
        <>
            <Button onClick={() => window.alert('gt')} color='blue'>
                Close
            </Button>
        </>
    )
}
