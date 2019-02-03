// export default {
//   state: {
//     instructorsList: [
//       {
//         id: 1,
//         name: 'Tom Krabson',
//         courses: 'A1, B1, B2'
//       },
//       {
//         id: 2,
//         name: 'Andrzej Sieka',
//         courses: 'A1, B1, B2, C1, C3'
//       }, 
//       {
//         id: 3,
//         name: 'Morgan Wpierdziel',
//         courses: 'C1, C2, B2'
//       }, 
//       {
//         id: 4,
//         name: 'Jessy Hamilton',
//         courses: 'A1, B1'
//       }
//     ],
//   },
//   getters: {
//    // getInstructor: state => id => state.instructorsList.find(instructor => instructor.id === id)
//     getInstructor: state => id => {
//       return state.instructorsList.filter(instructor => instructor.id === id);
//     }
//   },
//   actions: {
//     deleteInstructor: ({commit}, instructor) => {
//       commit('deleteInstructor', instructor);
//     }
//   },
//   mutations: {
//     deleteInstructor: (state, instructor) =>  {
//       state.instructorsList.splice(state.instructorsList.indexOf(instructor));
//     }
//   }
// };
