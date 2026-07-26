const fakeUsers = [
    {
        id: 1,
        username: "himani",
        name: "Himani Gurung",
        password: "password123",
        email: "himani@example.com",
        role: "Admin",
    },
]

export const loginUser = (credentials) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const user = fakeUsers.find(
                user =>
                    user.username === credentials.username &&
                    user.password === credentials.password
            )

            if (user) {
                resolve({
                    user: {
                        id: user.id,
                        username: user.username,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token: "fake-jwt-token",
                })
            } else {
                reject(new Error("Invalid credentials"))
            }

        }, 1000)
    })
}