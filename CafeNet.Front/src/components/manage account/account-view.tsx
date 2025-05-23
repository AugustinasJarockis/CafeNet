
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { User } from '@/services/employeeService';

export default function AccountView({
    user
} : { user: User }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center mt-10">
            <Card className="w-full max-w-md">
                <CardHeader>
                <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <strong>Name:</strong> {user.name}
                    </div>
                    <div className="mb-4">
                        <strong>Username:</strong> {user.username}
                    </div>
                    {user.role === 'CLIENT' && (
                        <div className="mb-4">
                        <strong>Location:</strong> {user.locationAddress}
                        </div>
                    )}
                    <Button className="mt-4" onClick={() => navigate('/account/edit')}>
                        Edit
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}