<?php

    namespace App\Events;

    use Illuminate\Broadcasting\Channel;
    use Illuminate\Broadcasting\InteractsWithSockets;
    use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
    use Illuminate\Foundation\Events\Dispatchable;
    use Illuminate\Queue\SerializesModels;

    class SocialMediaEvent implements ShouldBroadcast
    {
        use Dispatchable, InteractsWithSockets, SerializesModels;

        public $socialMedia;

        /**
         * Create a new event instance.
         */
        public function __construct($socialMedia)
        {
            $this->socialMedia = $socialMedia;
        }

        /**
         * Get the channels the event should broadcast on.
         *
         * @return array<int, Channel>
         */
        public function broadcastOn(): array
        {
            return [new Channel('socialMedia')];
        }
    }
