from inventory.models.outcome_detail import OutcomeDetail
from inventory.tests.test_base_model import BaseModelTestCase


class OutcomeDetailTestCase(BaseModelTestCase):
    def test_outcome_detail_can_be_created(self):
        self.assertIsInstance(self.outcome_detail, OutcomeDetail)
        self.assertEqual(self.outcome_detail.outcome, self.outcome)
