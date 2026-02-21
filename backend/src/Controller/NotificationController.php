<?php

namespace App\Controller;

use App\Repository\NotificationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class NotificationController extends AbstractController
{
    #[Route('/notifications', name: 'api_notifications', methods: ['GET'])]
    public function index(NotificationRepository $notifRepo): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json([], 401);
        }

        $notifications = $notifRepo->findBy(
            ['user' => $user],
            ['dateEnvoi' => 'DESC']
        );

        $data = array_map(function ($n) {
            return [
                'id' => $n->getId(),
                'sujet' => $n->getSujet(),
                'message' => $n->getMessage(),
                'dateEnvoi' => $n->getDateEnvoi()?->format('c'),
                'read' => $n->isRead(),
            ];
        }, $notifications);

        return $this->json($data);
    }

    #[Route('/notification/{id}/read', name: 'api_notification_read', methods: ['PUT'])]
    public function markAsRead(int $id, NotificationRepository $notifRepo, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        $notification = $notifRepo->find($id);
        if (!$notification || $notification->getUser() !== $user) {
            return $this->json(['error' => 'Not found'], 404);
        }

        $notification->setIsRead(true);
        $em->flush();

        return $this->json(['success' => true]);
    }
}
