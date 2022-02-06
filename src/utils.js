
export function norm(vec) {
    for (let i =  0; i < vec.length; i++){
         vec[i] /= math.norm(vec);
    }
}
