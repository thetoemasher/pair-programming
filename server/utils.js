const _ = require('lodash')

async function pairStudents(db, arr) {
        // let copy = shuffle(arr)
        let copy = arr.slice()
        let currentPairs = []
        let usedIndex = []
        let usedIds = []
        let numOfPairs = copy.length / 2
        let noPair = true
        let finalPairs = []

        for(let i = 0; i < numOfPairs; i++) {
            currentPairs.push([])
        }
    
        for(let i = 0; i < copy.length; i++) {
            let student = copy[i]
            if(student.workedwith.length === 0 && student.notworkedwith.length === 0) {
                for(let j = 0; j < copy.length; j++) {
                    if(student.id !== copy[j].id) {
                        student.notworkedwith.push(copy[j].id)
                    }
                }
            }
        }
    
        for(let i = 0; i < currentPairs.length; i++) {
            let notWithIndex = 0
            let index1 = 0
            let indexCheck = true
            let worked = true
            while(worked) {                    
            if(!noPair) {
                noPair = true
                index1 = copy.findIndex(s => s.id === currentPairs[i][0].id)
                let person = currentPairs[i][0]
                for(let p = 0; p < person.notworkedwith.length; p++) {
                    let id = person.notworkedwith[p]
                    if (id === currentPairs[i][1].id) {
                        notWithIndex = p
                        notWithIndex++
                    }
                }
                currentPairs[i].splice(1, 1)
                currentPairs[i].splice(0, 1)
                usedIds.splice(usedIds.length - 2, 2)
                usedIndex.splice(usedIndex.length - 2, 2)
            } else {
                while (indexCheck) {
                    if(usedIndex.includes(index1)) {
                        index1++
                        indexCheck = true
                    } else {
                        indexCheck = false
                    }
                }
            }
            let currentStudent = copy[index1]
            let pairCheck = true
            while(pairCheck && noPair) {
                let partnerId = currentStudent.notworkedwith[notWithIndex]
                if(currentStudent.workedwith.includes(partnerId) || usedIds.includes(partnerId)) {
                    pairCheck = true
                    notWithIndex++
                } else {
                    let partnerIndex = -1
                    copy.forEach((s, si) => {
                        if(s.id === partnerId) partnerIndex = si
                    })
                    if(partnerIndex !== -1) {
                        let partner = copy[partnerIndex]
                        let studentIndex = copy[partnerIndex].notworkedwith.findIndex(s => s.id === currentStudent.id)
                        usedIndex.push(index1, partnerIndex)
                        usedIds.push(currentStudent.id, partnerId)
                        currentPairs[i].push(currentStudent, partner)                            
                        pairCheck = false
                        worked = false
                    } else {
                        pairCheck = false
                        noPair = false
                        i--
                    }
                }
            }
        }
        }
        if(noPair) {
            let pairNames = []
            let promises = []
            for(let i = 0; i < currentPairs.length; i++) {
                let student1 = currentPairs[i][0]
                let student2 = currentPairs[i][1]
                let partner1Index = -1
                student1.notworkedwith.forEach((s, si) => {
                    if(s === student2.id)partner1Index = si
                })
                student1.notworkedwith.splice(partner1Index, 1)
                student1.workedwith.push(student2.id)
                let partner2Index = -1
                student2.notworkedwith.forEach((s, si) => {
                    if(s === student1.id) partner2Index = si
                })
                student2.notworkedwith.splice(partner2Index, 1)
                student2.workedwith.push(student1.id)
                pairNames.push(`${student1.student_name} & ${student2.student_name}`)
                promises.push(db.update_lists([student1.id, student1.notworkedwith, student1.workedwith]))
                promises.push(db.update_lists([student2.id, student2.notworkedwith, student2.workedwith]))
            }
            await Promise.all(promises).then(() => {
                finalPairs =  pairNames
            })
        }
        return finalPairs
}

function shuffle(arr) {
    let a = arr.slice()
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

async function restartStudents(db, arr) {            
    let newOrder = shuffle(arr)
    let promises = []
    let finalPairs = []
    for(let i = 0; i < newOrder.length; i++) {
        let order = i + 1
        promises.push(db.update_order([newOrder[i].id, order]))
    }
    await Promise.all(promises).then(() => {
        finalPairs =  pairStudents(db, newOrder)
    })
    return finalPairs
}

module.exports = async function letsDoThis(db, cohort) {

let pairs = []

        await db.get_students([cohort]).then(async students => {
            if(students[0].notworkedwith.length === 0 && students[0].workedwith.length > 0){
                await db.reset_partners([cohort]).then(async freshStudents => {
                    pairs = await restartStudents(db, freshStudents)

                })
            } else {
                let orderedStudents = _.sortBy(students, 'ordered')
                pairs =  await pairStudents(db, orderedStudents)
            }
        })
        return pairs
    }