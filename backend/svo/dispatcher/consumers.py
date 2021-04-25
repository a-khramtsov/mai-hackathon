from djangochannelsrestframework.consumers import AsyncAPIConsumer
from djangochannelsrestframework.observer import model_observer

from core.models import Application


class DispatcherConsumer(AsyncAPIConsumer):
    async def accept(self, subprotocol=None):
        await super().accept()
        await self.message_change_handler.subscribe()

    def receive(self, text_data=None, bytes_data=None, **kwargs):
        pass

    @model_observer(Application)
    async def message_change_handler(self, message, observer=None, action=None, **kwargs):
        await self.send_json(dict(status=200, body=message, action=action))

    @message_change_handler.groups_for_signal
    def message_change_handler_groups_for_signal(self, instance, **kwargs):
        yield f'-dispatcher'

    @message_change_handler.groups_for_consumer
    def message_change_handler_groups_for_consumer(self, **kwargs):
        yield f'-dispatcher'
