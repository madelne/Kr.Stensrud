import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
        _id: '',
    }),
    actions: {
        setProject(project: any) {
            this._id = project._id;
        },
    },
})
