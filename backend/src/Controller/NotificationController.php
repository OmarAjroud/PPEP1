<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class NotificationController extends AbstractController
{
    #[Route('/notifications', name: 'api_notifications', methods: ['GET'])]
    public function index(): JsonResponse
    {
        // No Notification entity yet. Return empty list.
        return $this->json([]);
    }
}
