import sequelize = require("sequelize");

// Get by ID
export function getById<I, M>(id: string, sequelizeModel: sequelize.Model<I, M>): Promise<I> {
    return new Promise<I>((resolve, reject) => {
        try {
            sequelizeModel.findById(id).then(
                (entity: I) => {
                    resolve(entity);
                }),
                (error: any) => {
                    reject(error);
                };
        }
        catch (error) {
            reject(error)
        }
    });
}

// Get All
export function getAll<I, M>(sequelizeModel: sequelize.Model<I, M>): Promise<I[]> {
    return new Promise<I[]>((resolve, reject) => {
        try {
            sequelizeModel.findAll().then(
                (entities: I[]) => {
                    resolve(entities);
                }),
                (error: any) => {
                    reject(error);
                };
        }
        catch (error) {
            reject(error)
        }
    });
}

// Update by ID
export function updateById<I, M>(
    id: string,
    sequelizeModel: sequelize.Model<I, M>,
    entityToUpdate: M): Promise<I> {

    return new Promise<I>((resolve, reject) => {
        const updateOptions: sequelize.UpdateOptions = {
            returning: true,
            where: { id: id }
        };

        sequelizeModel.update(entityToUpdate, updateOptions).then(
            () => {
                sequelizeModel.findById(id, { raw: true }).then(
                    (entity: I) => {
                        resolve(entity);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(err => {
                reject(err)
            });
    });
}

// Create New
export function createNew<I, M>(sequelizeModel: sequelize.Model<I, M>, entityToAdd: M): Promise<I> {
    return new Promise<I>((resolve, reject) => {
        sequelizeModel.create(entityToAdd).then(
            (roleInstance: I) => {
                resolve(roleInstance);
            },
            (error: any) => {
                reject(error);
            });

    });
}

// Delete 
export function deleteEntity<I, M>(id: string, sequelizeModel: sequelize.Model<I, M>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const options: sequelize.DestroyOptions = { where: { id: id } };

        sequelizeModel.destroy(options).then(
            () => {
                resolve();
            },
            (error: any) => {
                reject(error);
            }
        );

    });
}