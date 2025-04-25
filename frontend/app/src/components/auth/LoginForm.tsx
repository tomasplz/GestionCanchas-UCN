import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <Button type="submit" className="w-full">
                Iniciar sesión
            </Button>
        </form>
    );
};