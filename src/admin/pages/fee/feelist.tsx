import { Feecard } from './feecard'

import type { IIfees } from '../../../types/fee.types'

interface Ifees {
    fees: IIfees[]
    semester: string
    course: string
}

export const Feelist = ({ fees, semester, course }: Ifees) => {
    return (
        <div className="text-white grid grid-cols-3 shadow-2xl border-2 gap-3 gap-y-2.5 py-5 px-5  min-h-screen shadow-2xl">
            {fees.map((items) => (
                <Feecard key={items._id} fee={items} semester={semester} course={course} />
            ))}
    </div>
    )
}
